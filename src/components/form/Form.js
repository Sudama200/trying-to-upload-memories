import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64'; 
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/posts';

const Form = ({currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const post = useSelector((state) => currentId ? state.posts.find(p => p._id === currentId) : null)
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    tags: '',
    message: '',
    selectedFile: ''
  });

  useEffect(() => {
    if(post){
      setPostData(post)
    }
  
    
  }, [post])
  
  const handleSubmit = (e) => {
      e.preventDefault()
      console.log(postData);
      if(currentId){
        dispatch(updatePost(currentId, postData))
      }else{
        dispatch(createPost(postData))
      }
      clear();
    }

    const onChange = (e) => {

      setPostData({...postData, [e.target.name]: e.target.value})

    }

    const clear = () => {
      setPostData({
        creator: '',
        title: '',
        tags: '',
        message: '',
        selectedFile: ''
      })
    }



  return (
    <Paper className={classes.paper}>
      <form className={classes.form} autoComplete='off' noValidate onSubmit={handleSubmit} >
        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a memory</Typography>
        <TextField 
        name='creator'
        variant='outlined'
        label='Creator'
        fullWidth
        value={postData.creator}
        onChange={onChange}
        />
        <TextField 
        name='title'
        variant='outlined'
        label='Title'
        fullWidth
        value={postData.title}
        onChange={onChange}
        />
        <TextField 
        name='message'
        variant='outlined'
        label='Message'
        fullWidth
        value={postData.message}
        onChange={onChange}
        />
        <TextField 
        name='tags'
        variant='outlined'
        label='Tags'
        fullWidth
        value={postData.tags}
        onChange={onChange}
        />
        <div className={classes.fileInput} >
          <FileBase
          multiple={false}
          name='tagselectedFiles'
          type='file'
          onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
          />
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' fullWidth size='large' type='submit'>Submit</Button>
        <Button  variant='contained' color='secondary' fullWidth size='small' onClick={clear}>Clear</Button>

      </form>
    </Paper>
  )
}

export default Form
