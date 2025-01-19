import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  // EditIcon
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function Banner({ texto, backgroundImage }) {
  const [videos, setVideos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newVideo, setNewVideo] = useState({
    titulo: "",
    video: "",
    category: "",
    path: "",
    description: "",
  });

  // Función para abrir el modal y asignar el video seleccionado
  const handleOpenModal = (video) => {
    setSelectedVideo(video);
    setOpenModal(true);
    setEditMode(false);
  };
  const handleEditMode = () => {
    setEditMode(true);
  };

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVideo(null);
    setEditMode(false);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
   
  
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedVideo({
      ...selectedVideo,
      [name]: value,
    });
  };

  const handleInputChangeCreate = (event) => {
    const { name, value } = event.target;
  
    setNewVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value, // Actualiza solo el campo que se modificó
    }));
  };
  const  [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpenModalCreate = (e) => {
    setOpenModalCreate(true)
  };
  console.log(selectedVideo?.id, "el id mirar");
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/videos/${selectedVideo?.id}`,
        selectedVideo
      );
      
      setVideos((prevVideos) =>
        prevVideos?.map((video) =>
          video?.id === selectedVideo?.id ? selectedVideo : video
        )
      );
     setEditMode(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleSaveNewVideo = async () => {
    if (!newVideo.titulo || !newVideo.video || !newVideo.category || !newVideo.path || !newVideo.description) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });
  
      if (!response.ok) {
        throw new Error("Error al guardar el video");
      }
  
      const data = await response.json();
      setVideos((prevVideos) => [...prevVideos, data]);
      setNewVideo({ titulo: "", video: "", category: "", path: "", description: "" }); 
      handleCloseModalCreate(); 
    } catch (error) {
      console.error("Error al guardar el video:", error);
      alert("Hubo un problema al guardar el video.");
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este video?")) {
      return; 
    }
  
    try {
      const response = await fetch(`http://localhost:5000/videos/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Error al eliminar el video");
      }
  
      
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    } catch (error) {
      console.error("Error al eliminar el video:", error);
      alert("Hubo un problema al eliminar el video.");
    }
  };
  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{display:"flex", justifyContent:"space-between"}}>

      <Typography variant="h4" component="h2" gutterBottom>
        Galería de Videos
      </Typography>
      <IconButton
                   onClick={handleOpenModalCreate}
                    sx={{
                    
                      cursor: "pointer",
                    }}
                    
                  >


<AddIcon sx={{color:"blue"}}/>
                  </IconButton>
      </Box>
      <Backdrop
  sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={openModalCreate}
  onClick={(event) => event.stopPropagation()}
>
  <Dialog
    open={openModalCreate}
    onClose={handleCloseModalCreate}
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle>
      Cargar Nuevo Video
      <Box
        sx={{
          gap: 2,
          display: "flex",
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <IconButton onClick={handleCloseModalCreate}>
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>

    <DialogContent>
      <TextField
        fullWidth
        label="Título"
        name="titulo"
        value={newVideo?.titulo || ""}
        onChange={handleInputChangeCreate}
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        fullWidth
        label="URL del Video"
        name="video"
        value={newVideo?.video || ""}
        onChange={handleInputChangeCreate}
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        fullWidth
        label="Categoría"
        name="category"
        value={newVideo?.category || ""}
        onChange={handleInputChangeCreate}
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        fullWidth
        label="Imagen (URL)"
        name="path"
        value={newVideo?.path || ""}
        onChange={handleInputChangeCreate}
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        fullWidth
        label="Descripción"
        name="description"
        multiline
        rows={3}
        value={newVideo?.description || ""}
        onChange={handleInputChangeCreate}
        sx={{ marginBottom: "10px" }}
      />
    </DialogContent>

    <Box sx={{ padding: 2, textAlign: "center" }}>
      <Button variant="contained" color="primary" onClick={handleSaveNewVideo}>
        Guardar Video
      </Button>
    </Box>
  </Dialog>
</Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openModal}
        onClick={(event) => event.stopPropagation()}
      >
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Editar Video
            <Box
              sx={{
                gap: 2,
                display: "flex",
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              {!editMode && (
                <>
                  <IconButton onClick={handleEditMode}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedVideo && (
              <>
                {editMode ? (
                  <TextField
                    fullWidth
                    label="Título"
                    name="titulo"
                    value={selectedVideo?.titulo}
                    onChange={handleInputChange}
                    sx={{ marginBottom: "10px" }}
                  />
                ) : (
                  <Typography variant="h6">
                    Título: {selectedVideo?.titulo}
                  </Typography>
                )}

                {editMode && (
                  <TextField
                    fullWidth
                    label="Url Video"
                    name="video"
                    value={selectedVideo?.video}
                    onChange={handleInputChange}
                    sx={{ marginBottom: "10px" }}
                  />
                )}

                {!editMode && selectedVideo?.video && (
                  <a
                    href={selectedVideo?.video}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={selectedVideo?.path}
                      alt={selectedVideo?.titulo}
                    />
                  </a>
                )}
              </>
            )}
          </DialogContent>
          {editMode && (
            <Box sx={{ padding: 2, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
              >
                Guardar Cambios
              </Button>
            </Box>
          )}
        </Dialog>
      </Backdrop>

      <Grid container spacing={3}>
        {videos?.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video?.id}>
            <Card
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
              onClick={() => handleOpenModal(video)} // Abre el video en el modal
            >
              {/* Si el video tiene un campo de "video", mostramos un iframe */}
              {video?.video ? (
                <a
                  href={video?.video}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={video?.path} // Aquí también la imagen del video
                    alt={video?.titulo}
                  />
                </a>
              ) : (
                <CardMedia
                  component="img"
                  height="180"
                  image={video?.path}
                  alt={video?.titulo}
                />
              )}

              <CardContent
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Typography variant="h6">{video.titulo}</Typography>
               

                <Tooltip title="Editar">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Para evitar que se abra el modal al hacer clic en el ícono
                      handleOpenModal(video);
                    }}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      cursor: "pointer",
                    }}
                    aria-label="editar"
                  >
                    <EditIcon fontSize="small" sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </CardContent>
              <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 1,
          }}
        >
          <Tooltip title="Eliminar">
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); 
                handleDeleteVideo(video?.id); 
              }}
              aria-label="eliminar"
            >
              <DeleteIcon fontSize="small" sx={{ color: "grey" }} />
            </IconButton>
          </Tooltip>
        </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
