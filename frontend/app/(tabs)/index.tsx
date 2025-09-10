import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TodoCard } from '@/components/TodoCard';
import { todosService, Todo, TodoQuery } from '@/services/todos';
import { Theme } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TodosScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const debouncedLoadTodos = useCallback(
    debounce(() => loadTodos(), 300),
    [filter]
  );

  useEffect(() => {
    debouncedLoadTodos();
  }, [filter, search, debouncedLoadTodos]);

  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const loadTodos = async () => {
    try {
      const query: TodoQuery = {};
      if (filter !== 'all') {
        query.status = filter;
      }
      if (search) {
        query.search = search;
      }
      
      const response = await todosService.getTodos(query);
      setTodos(response.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load todos'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      await todosService.updateTodo(todo.id, { isCompleted: !todo.isCompleted });
      setTodos(todos.map(t => 
        t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
      ));
      Toast.show({
        type: 'success',
        text1: 'Todo Updated',
        text2: todo.isCompleted ? 'Marked as pending' : 'Marked as completed'
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update todo'
      });
    }
  };

  const deleteTodo = async (id: number) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await todosService.deleteTodo(id);
              setTodos(todos.filter(t => t.id !== id));
              Toast.show({
                type: 'success',
                text1: 'Todo Deleted',
                text2: 'Todo has been removed'
              });
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete todo'
              });
            }
          }
        }
      ]
    );
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <TodoCard
      todo={item}
      onToggle={() => toggleTodo(item)}
      onDelete={() => deleteTodo(item.id)}
    />
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>My Todos</ThemedText>
        <ThemedText style={styles.subtitle}>
          {todos.filter(t => !t.isCompleted).length} pending tasks
        </ThemedText>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, {
            backgroundColor: isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary,
            borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
            color: isDark ? Theme.colors.textDark : Theme.colors.text
          }]}
          placeholder="Search todos..."
          placeholderTextColor={isDark ? Theme.colors.textTertiaryDark : Theme.colors.textTertiary}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      
      <View style={styles.filters}>
        {(['all', 'pending', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, {
              backgroundColor: filter === f 
                ? Theme.colors.primary 
                : (isDark ? Theme.colors.backgroundSecondaryDark : Theme.colors.backgroundSecondary),
              borderColor: isDark ? Theme.colors.borderDark : Theme.colors.border,
            }]}
            onPress={() => setFilter(f)}
          >
            <ThemedText style={[styles.filterText, {
              color: filter === f ? 'white' : (isDark ? Theme.colors.textDark : Theme.colors.text)
            }]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={loadTodos}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No todos found</ThemedText>
            <ThemedText style={styles.emptySubtext}>Create your first todo to get started</ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.md,
  },
  header: {
    marginBottom: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 14,
  },
  searchContainer: {
    marginBottom: Theme.spacing.md,
  },
  searchInput: {
    borderWidth: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    fontSize: 16,
    ...Theme.shadows.sm,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  filterButton: {
    flex: 1,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
    alignItems: 'center',
    borderWidth: 1,
    ...Theme.shadows.sm,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: Theme.spacing.xxl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
    opacity: 0.6,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.5,
  },
});