import React from 'react';
import sampleData from '../Assets/frontend_data';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Page from './Page';
import IrisContainer from '../Assets/IrisContainer';
import { Grid, Typography, TextField, Card } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


function Manuscript(){
    let { path, url } = useRouteMatch();
    let { text , manuscript } = useParams();

    console.log('manuscript: ' + manuscript)

    return (
        <div>
            <Switch>
                <Route exact path={path}>
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
                                    <Typography variant='h5'>{text}</Typography>
                                    </Card>
                                    <Card className='dropdown-card'>
                                    <Typography variant='h5'>{manuscript}</Typography>
                                    </Card>


                                    <Card className='dropdown-card'>

                                            <Autocomplete
                                                    id="combo-box-demo"
                                                    options={[{title: 'Page 1'}]}
                                                    getOptionLabel={(option) => option.title}
                                                    style={{ width: 500 }}
                                                    renderInput={(params) => <TextField {...params} label="Choose a page" variant="outlined" />}
                                                    onChange={(event, newValue) => {
                                                        window.location.href = `/Sobti/text/${text}/manuscript/${manuscript}/page/${newValue.title}`;

                                                    }}
                                                    // onClose={(event) => {
                                                    //     setInManuscript(true)
                                                    // }}
                                                />
                                        </Card>
                                    {/* <Link
                                        to={`/Sobti/text/${text}/manuscript/1`}
                                    >
                                        <Typography variant='body1'>Click for Manuscript 1</Typography>
                                    </Link> */}
                                </div>
                            </Grid>
                        </Grid>
                    </IrisContainer>
                </Route>
                <Route path={'/Sobti/text/:text/manuscript/:manuscript/page/:page'}>
                    <Page />
                </Route>
            </Switch>           
        </div>
    );
}


export default Manuscript; 