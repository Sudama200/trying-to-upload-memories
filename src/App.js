import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import memories from '../src/images/memories.png';
import Form from './components/form/Form';
import Posts from './components/posts/Posts';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { getPosts } from './redux/actions/posts';

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        dispatch(getPosts);
    }, [currentId])
    return(
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt='memories' height='60' width='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} >
                         <Grid item xs={12} sm={6}>
                            <Posts setCurrentId={setCurrentId} currentId={currentId}/>
                         </Grid>
                         <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                         </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;