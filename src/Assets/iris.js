import { create, all } from 'mathjs';
import * as d3 from 'd3';
var _ = require('lodash');

export default function iris(m, alpha) {
    let fPurple = 2*Math.PI/3.0;
    let fScale = 0.8;
    let fOffset = 0.0;
    let vCM = [];
    
    for(let i=0; i<m; i++) {
        let fTh = (i/m) * (Math.PI*2 - fPurple)
        vCM.push(`rgba(${255*(fScale*(Math.cos(fTh)+1)/2+fOffset)}, ${255*(fScale*(Math.cos(fTh-2*Math.PI/3)+1)/2+fOffset)}, ${255*(fScale*(Math.cos(fTh-4*Math.PI/3)+1)/2+fOffset)}, ${alpha})`);
    }
    return vCM;
}