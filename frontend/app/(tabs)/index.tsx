import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { todosService, Todo, TodoQuery } from '@/services/todos';

export default function TodosScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    loadTodos();
  }, [filter, search]);

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
    <View style={styles.todoItem}>
      <TouchableOpacity 
        style={styles.todoContent}
        onPress={() => toggleTodo(item)}
      >
        <View style={[styles.checkbox, item.isCompleted && styles.checkboxCompleted]} />
        <View style={styles.todoText}>
          <ThemedText 
            style={[styles.title, item.isCompleted && styles.completedText]}
          >
            {item.title}
          </ThemedText>
          {item.description && (
            <ThemedText style={styles.description}>{item.description}</ThemedText>
          )}
          <View style={styles.todoMeta}>
            <ThemedText style={styles.priority}>Priority: {item.priority}</ThemedText>
            {item.dueDate && (
              <ThemedText style={styles.dueDate}>
                Due: {new Date(item.dueDate).toLocaleDateString()}
              </ThemedText>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
      >
        <ThemedText style={styles.deleteText}>Delete</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>My Todos</ThemedText>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search todos..."
        value={search}
        onChangeText={setSearch}
      />
      
      <View style={styles.filters}>
        {['all', 'pending', 'completed'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.activeFilter]}
            onPress={() => setFilter(f as any)}
          >
            <ThemedText style={[styles.filterText, filter === f && styles.activeFilterText]}>
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
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>No todos found</ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
  },
  activeFilterText: {
    color: 'white',
  },
  todoItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    marginRight: 12,
  },
  checkboxCompleted: {
    backgroundColor: '#007AFF',
  },
  todoText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  todoMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  priority: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#ff4444',
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.6,
  },
});