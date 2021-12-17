import React, { useState } from 'react';
import Konva from 'konva';
import sampleData from '../Assets/frontend_data';
import { Stage, Layer, Rect, Text, Circle, Line, Image } from 'react-konva';
import useImage from 'use-image';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Paper, Card, Typography, Grid, CardActions, CardContent, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
import pageImage from '../media/000006/000009/000124/layers/01.png';
import iris from '../Assets/iris';

// test
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';


const _ = require('lodash');

const columns = [
  {  
    field: 'number_in_line',     
    headerClassName: 'data-grid--header',
    headerName: 'Order', 
    width: 115, 
    editable: true 
  },
  { 
    field: 'image', 
    headerClassName: 'data-grid--header',
    headerName: 'Image', 
    width: 200, 
    editable: false,
    // renderCell: (params: GridRenderCellParams) => {
    //   <strong>
    //     {params.value}
    //   </strong>
    // } 
  },
  { 
    field: 'unicode_glyphs', 
    headerClassName: 'data-grid--header',
    headerName: 'Unicode', 
    width: 180, 
    editable: true 
  },
  // { field: 'manuel_de_codage', headerName: 'Manuel de Codage', editable: true },
  // { field: 'moller_number', headerName: 'Moller', editable: true },
  // { field: 'mainz_number', headerName: 'Mainz', editable: true }
];

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  }
});


function ManuscriptImage(){
  const [image] = useImage(pageImage);
  return <Image image={image} />;
}

function loadGlyphImages(){
  
}

export default function Page() {
    const classes = useStyles();
    let { text, manuscript, page } = useParams();
    let [active, setActive] = useState('');
    let [activeLine, setActiveLine] = useState(sampleData['lines'][0]);
    let [activeGlyph, setActiveGlyph] = useState(sampleData['lines'][0]['glyphs'][0]);


    let lengths = [sampleData['lines'].length]
    for (let i = 0; i < sampleData['lines'].length; i ++){
      lengths.push(sampleData['lines'][i]['glyphs'].length)
    }

    const m = Math.max(...lengths);

    const irisArray = iris(m, .6);

    console.log(activeLine['glyphs'])

    return (
      <div>
        <Typography>
          Story of Sinuhe
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item>
        <Stage width={sampleData['facsimile']['width']} height={sampleData['facsimile']['height']}>
          <Layer>
            <ManuscriptImage/>
          </Layer>
          
          <Layer>
            {sampleData['lines'].map((line, index) => 
              <Line 
                x={0}
                y={0}
                id={`line_${index}`}
                points={_.flatten(line['polygon'])}
                tension={0.5}
                closed
                fill={(active === `line_${index}` || activeLine['number_in_page']-1 === index) ? irisArray[index] : null}
                onMouseEnter={(event) => setActive(`line_${index}`)}
                onClick = {(event) => setActiveLine(sampleData['lines'][index])}
              />
            )}
            </Layer>
            <Layer>
            {sampleData['lines'].map((line, i) =>
              line['glyphs'].map((glyph, j) => 
                <Line
                    x={0}
                    y={0}
                    id={`line_${i}_glyph_${j}`}
                    points={_.flatten(glyph['polygon'])}
                    tension={0.5}
                    closed
                    fill={active === `line_${i}_glyph_${j}` ? irisArray[j] : null }
                    onMouseEnter={(event) => setActive(`line_${i}_glyph_${j}`)}
                    />
              )
            )}
                {/* {sampleData['lines'][0]['glyphs'].map(glyph => 
                    <Line
                    x={0}
                    y={0}
                    points={_.flatten(glyph['polygon'])}
                    tension={0.5}
                    closed
                    stroke="black"
                    fill="rgba(0, 60, 255, 0.24)"
                    />
                )} */}
            </Layer>
          </Stage>
          </Grid>

          <Grid item xs >
            <Card 
              className={classes.root} 
              style={{
                      backgroundColor: irisArray[activeLine['number_in_page']-1]
                    }} 
            >
                <CardContent>
                  <Typography 
                    variant='h5'
                  >
                    Line {activeLine['number_in_page']}
                  </Typography>
              </CardContent>
              <CardActions>
                {/* <Button> Next Page</Button> */}
              </CardActions>
            </Card>

            <br/>
            <br/>


                <div  style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    pageSize={activeLine['glyphs'].length}
                    getRowId={(row)=>row.pk}
                    columns={columns}
                    rows={activeLine['glyphs'].map(glyph => {
                      return {   
                        pk: glyph.pk,
                        image: <DeleteSharpIcon/>,
                        number_in_line: glyph.number_in_line,
                        number_in_page: glyph.number_in_page,
                        unicode_glyphs: glyph.unicode_glyphs,
                        polygon: glyph.polygon
                      }
                    })}
                  />
                </div>
                
          </Grid>
          
        
        </Grid>
         
      </div>
    );
}