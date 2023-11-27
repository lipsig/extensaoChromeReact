
import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { useChromeStorageLocal } from 'use-chrome-storage';
import Loja from "./Components/Loja/Loja.tsx"

function App() {
  const [value, setValue, isPersistent] = useChromeStorageLocal('counterLocal', 0);
  const [Tasks, setTasks] = useChromeStorageLocal('tasks', []);
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const [newAdminValue, setNewAdminValue] = useState(''); // State to store the new jobber value
  const [newIdJobber, setNewIdJobber] = useState(''); // State to store the new jobber value


  const lojaInitial = {
    id: value,
    nome: "Task",
    idJobber: "1",
    link: "https://vtex.com/",
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const handleIdJobberChange = (event) => {
    setNewIdJobber(event.target.value);
  };

  const handleAdminChange = (event) => {
    setNewAdminValue(event.target.value);
  };

  const addNewTask = () => {
    const newTask = { ...lojaInitial, link: newAdminValue, idJobber: newIdJobber };
    setTasks([...Tasks, newTask]);
    setValue(prev => (prev + 1));
    closeModal();
  };

  return (
    <div className="App">
      <div className="container">
        <h5 className="copy">Todos os direitos por Felipe Lourenzi</h5>
        <h2 className="titleApp">Minhas Tarefas</h2>
        <button className="newStoreButton"  onClick={() =>openModal()}>
          Nova Task +
        </button>
        {showModal && (
        <button className="closeModal" onClick={() =>closeModal()}>
          X
        </button>
        )}
        <div className='nTarefas'>N de Tarefas: {Tasks.length}</div>
        <button className="clearButton" onClick={() => setTasks([])}>
          Limpar
        </button>
        {showModal && (
          <div className='modal'>
            <input
              type="text"
              placeholder="ID da Task no Jobber"
              maxLength={8}
              value={newIdJobber}
              onChange={handleIdJobberChange}
            />
            <input
              type="text"
              placeholder="Link do Admin/Workspace"
              value={newAdminValue}
              onChange={handleAdminChange}
            />            
            <button className='modalAddTask' onClick={addNewTask}>Adicionar</button>
          </div>
        )}
        <div className="lojas-list">
          {Tasks.map(item => (
            <Loja Tasks={Tasks} setTasks={setTasks} loja={item} key={item.id}></Loja>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
