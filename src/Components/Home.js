import React, {useState} from 'react';
import sampleData from '../Assets/frontend_data';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Text from './Text';
import { Grid, Typography, TextField, Card } from '@material-ui/core';
import IrisContainer from '../Assets/IrisContainer';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CSSTransition } from 'react-transition-group';

import '../index.css';
import { Container } from '@material-ui/core';

function Home(){

    const [inManuscript, setInManuscript] = useState(false);

    return (
        <div>
            {/* Switch between showing texts, manuscripts, and pages */}
            <Router>
                <Switch>
                    <Route exact path={`/`}>
                        <IrisContainer>

                            <Grid 
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <div style={{height: '75vh', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <Typography variant='h2'>
                                            Welcome to Ⲥⲟⲃϯ
                                        </Typography>
                                        <Typography variant='h5'>
                                            Ⲥⲟⲃϯ is a web-app for annotating Hieratic texts.
                                        </Typography>
                                        <br />
                                        <br />

                                        <Card className='dropdown-card'>

                                            <Autocomplete
                                                    id="combo-box-demo"
                                                    options={[{title: 'The Story of Sinuhe (-1962)'}]}
                                                    getOptionLabel={(option) => option.title}
                                                    style={{ width: 500 }}
                                                    renderInput={(params) => <TextField {...params} label="Choose a text" variant="outlined" />}
                                                    onChange={(event, newValue) => {
                                                        window.location.href = `/Sobti/text/${newValue.title}`;

                                                    }}
                                                    onClose={(event) => {
                                                        setInManuscript(true)
                                                    }}
                                                />
                                        </Card>
                                        

                                        {/* <CSSTransition in={inManuscript} timeout={500} classNames="choice" unmountOnExit>
                                            <div>
                                                <Card className='dropdown-card'>
                                                    Whaddup
                                                </Card>
                                            </div>
                                            
                                            
                                        </CSSTransition> */}
                                    </div>
                                </Grid>
                            </Grid>
                        </IrisContainer>
                    </Route>
                    <Route path={'/Sobti/text/:text'}>
                        <Text/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}


export default Home; 