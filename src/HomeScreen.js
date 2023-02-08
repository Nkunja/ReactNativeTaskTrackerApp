import React, {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {View, Text, Button, FlatList, TextInput} from 'react-native';

const HomeScreen = () => {
  const [taskList, setTaskList] = useState({tasks: []});
  const [taskName, setTaskName] = useState('');

  const onAddTask = () => {
    Geolocation.getCurrentPosition(
      position => {
        setTaskList({
          tasks: [
            ...taskList.tasks,
            {
              taskName,
              completed: false,
              location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            },
          ],
        });
        setTaskName('');
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const onMarkTaskAsCompleted = index => {
    Geolocation.getCurrentPosition(
      position => {
        const newTasks = [...taskList.tasks];
        newTasks[index].completed = !newTasks[index].completed;
        newTasks[index].location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setTaskList({tasks: newTasks});
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <View>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setTaskName(text)}
        value={taskName}
        placeholder="Task name"
      />
      <Button onPress={onAddTask} title="Add Task" />
      <FlatList
        data={taskList.tasks}
        renderItem={({item, index}) => (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                textDecorationLine: item.completed ? 'line-through' : 'none',
              }}>
              {item.taskName}
            </Text>
            <Button
              onPress={() => onMarkTaskAsCompleted(index)}
              title={item.completed ? 'Mark Incomplete' : 'Mark Complete'}
            />
          </View>
        )}
        keyExtractor={item => item.taskName}
      />
    </View>
  );
};

export default HomeScreen;
