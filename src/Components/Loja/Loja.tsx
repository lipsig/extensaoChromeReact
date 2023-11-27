import React, {useState,useEffect} from 'react';
import './style.css'
import vtexLogo from '../../Assets/Logos/vtex.png';
import jobberLogo from '../../Assets/Logos/jobber.png';

function Loja(props) {
    const [editModal, setEditModal] = useState(false); 
    const [editIdJobber, setEditIdJobber] = useState(props.loja.idJobber);
    const [editLink, setEditLink] = useState(props.loja.link);    

    useEffect(() => {
        setEditIdJobber(props.loja.idJobber);
        setEditLink(props.loja.link);
    }, [props.loja.idJobber, props.loja.link]);    
  
    const clickJobberHandler = () => {
        window.open("https://jobber.team/jobs/details/"+props.loja.idJobber, '_blank', 'noreferrer');
    }
    const clickAdminHandler = () => {
        if(editLink.includes("https://")){
            window.open(props.loja.link, '_blank', 'noreferrer');
        }
        else{
            window.open("https://"+props.loja.link, '_blank', 'noreferrer');
        }       
    }
    const openEditModal = () => {
        setEditModal(true);
      };
    
    const closeEditModal = () => {
        setEditModal(false);
    };
    const handleEditIdJobberChange = (event) => {
    setEditIdJobber(event.target.value);
    };

    const handleEditLink = (event) => {
    setEditLink(event.target.value);
    };
    const editarTask = () => {
        const updatedTasks = props.Tasks.map((item) => {
            if (item.id === props.loja.id) {
              return {
                ...item,
                idJobber: editIdJobber,
                link: editLink,
              };
            }
            return item;
          });
      
          props.setTasks(updatedTasks);
          closeEditModal();
      };
    const deleteTask = (taskId) => {
        const updatedTasks = props.Tasks.filter(item => item.id !== taskId);
        props.setTasks(updatedTasks);
    };
    return (
        <div className="lojaBlock">
            <h2>ID:{props.loja.idJobber} </h2>
            {editModal && (
                <button className="closeModal edit" onClick={() => closeEditModal()}>
                    X
                </button>
            )}
            <button className='editarTask'
                onClick={() => { openEditModal() }}
            >Editar
            </button>
            <button className='deletarTask'
                onClick={() => { deleteTask(props.loja.id) }}
            >Deletar
            </button>
            {editModal && (
                <div className='lojaModal'>
                    <input
                        type="text"
                        placeholder="ID da Task no Jobber"
                        maxLength={8}
                        value={editIdJobber}
                        onChange={handleEditIdJobberChange}
                    />
                    <input
                        type="text"
                        placeholder="Link do Admin/Workspace"
                        value={editLink}
                        onChange={handleEditLink}
                    />
                    <button className='modalAddTask' onClick={editarTask}>Salvar</button>
                </div>
            )}
            <div className='storeTask'>
                <div className='jobber'>
                    <span>Jobber:</span>
                    <br />
                    <img onClick={() => clickJobberHandler()} src={jobberLogo}></img>
                </div>
                <div className='admin'>
                    <span>Workspace:</span>
                    <br />
                    <img onClick={() => clickAdminHandler()} src={vtexLogo}></img>
                </div>
            </div>
        </div>
    )
}

export default Loja;