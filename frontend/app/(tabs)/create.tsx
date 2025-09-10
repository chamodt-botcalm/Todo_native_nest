import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { todosService, CreateTodoData } from '@/services/todos';
import { Theme } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function CreateTodoScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleCreate = async () => {
    if (!title.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a title'
      });
      return;
    }

    setIsLoading(true);
    try {
      const todoData: CreateTodoData = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
      };

      await todosService.createTodo(todoData);
      
      Toast.show({
        type: 'success',
        text1: 'Todo Created',
        text2: 'Your todo has been added successfully'
      });

      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      
      // Navigate back to todos list
      router.push('/(tabs)');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to create todo'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.icon, { backgroundColor: Theme.colors.success }]}>
            <ThemedText style={styles.iconText}>+</ThemedText>
          </View>
          <ThemedText type="title" style={styles.title}>Create New Todo</ThemedText>
          <ThemedText style={styles.subtitle}>Add a new task to your list</ThemedText>
        </View>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Title *</ThemedText>
            <TextInput
              style={[styles.input, {
                backgroundColor: isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary,
                borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
                color: isDark ? Theme.colors.textDark : Theme.colors.text
              }]}
              placeholder="Enter todo title"
              placeholderTextColor={isDark ? Theme.colors.textTertiaryDark : Theme.colors.textTertiary}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Description</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea, {
                backgroundColor: isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary,
                borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
                color: isDark ? Theme.colors.textDark : Theme.colors.text
              }]}
              placeholder="Enter description (optional)"
              placeholderTextColor={isDark ? Theme.colors.textTertiaryDark : Theme.colors.textTertiary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Priority</ThemedText>
            <View style={[styles.priorityContainer]}>
              {(['low', 'medium', 'high'] as const).map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.priorityButton, {
                    backgroundColor: priority === p 
                      ? (p === 'high' ? Theme.colors.error : p === 'medium' ? Theme.colors.warning : Theme.colors.success)
                      : (isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary),
                    borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
                  }]}
                  onPress={() => setPriority(p)}
                >
                  <ThemedText style={[styles.priorityText, {
                    color: priority === p ? 'white' : (isDark ? Theme.colors.textDark : Theme.colors.text)
                  }]}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Due Date (Optional)</ThemedText>
            <TextInput
              style={[styles.input, {
                backgroundColor: isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary,
                borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
                color: isDark ? Theme.colors.textDark : Theme.colors.text
              }]}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={isDark ? Theme.colors.textTertiaryDark : Theme.colors.textTertiary}
              value={dueDate}
              onChangeText={setDueDate}
              maxLength={10}
            />
            <ThemedText style={styles.hint}>Format: YYYY-MM-DD (e.g., 2024-12-31)</ThemedText>
          </View>

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleCreate}
            disabled={isLoading}
          >
            <ThemedText style={styles.buttonText}>
              {isLoading ? 'Creating...' : 'Create Todo'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  header: {
    alignItems: 'center',
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xxl,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.md,
  },
  iconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 14,
  },
  form: {
    gap: Theme.spacing.lg,
  },
  inputGroup: {
    gap: Theme.spacing.sm,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    fontSize: 16,
    ...Theme.shadows.sm,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  priorityButton: {
    flex: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.sm,
    alignItems: 'center',
    borderWidth: 1,
    ...Theme.shadows.sm,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  hint: {
    fontSize: 12,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: Theme.colors.success,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    marginTop: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});