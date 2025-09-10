import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Theme } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Todo } from '@/services/todos';

interface TodoCardProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export function TodoCard({ todo, onToggle, onDelete }: TodoCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return Theme.colors.error;
      case 'medium': return Theme.colors.warning;
      case 'low': return Theme.colors.success;
      default: return Theme.colors.textTertiary;
    }
  };

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary,
        borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
      },
      Theme.shadows.sm
    ]}>
      <TouchableOpacity style={styles.content} onPress={onToggle}>
        <View style={[
          styles.checkbox,
          {
            borderColor: Theme.colors.primary,
            backgroundColor: todo.isCompleted ? Theme.colors.primary : 'transparent'
          }
        ]}>
          {todo.isCompleted && (
            <ThemedText style={styles.checkmark}>✓</ThemedText>
          )}
        </View>
        
        <View style={styles.textContent}>
          <ThemedText style={[
            styles.title,
            todo.isCompleted && styles.completedText
          ]}>
            {todo.title}
          </ThemedText>
          
          {todo.description && (
            <ThemedText style={styles.description}>
              {todo.description}
            </ThemedText>
          )}
          
          <View style={styles.meta}>
            <View style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(todo.priority) }
            ]}>
              <ThemedText style={styles.priorityText}>
                {todo.priority.toUpperCase()}
              </ThemedText>
            </View>
            
            {todo.dueDate && (
              <ThemedText style={styles.dueDate}>
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </ThemedText>
            )}
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.deleteButton, { backgroundColor: Theme.colors.error }]}
        onPress={onDelete}
      >
        <ThemedText style={styles.deleteText}>×</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: Theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: Theme.spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  priorityBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
  },
  priorityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Theme.spacing.sm,
  },
  deleteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});