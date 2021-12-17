import useRainbow from './useRainbow.hook';
import { Container } from '@material-ui/core';


const IrisContainer = ({children, intervalDelay = 500}) => {
  const transitionDelay = intervalDelay * 3.25;

  const colors = useRainbow({ intervalDelay });

  const colorKeys = Object.keys(colors);

    return (
        <div
            style={{
                ...colors,

                height: '100vh',
                
                transition: `
                    ${colorKeys[0]} ${transitionDelay}ms linear, 
                    ${colorKeys[1]} ${transitionDelay}ms linear, 
                    ${colorKeys[2]} ${transitionDelay}ms linear
                `,

                background: `
                    radial-gradient(
                        circle at top left, 
                        var(${colorKeys[2]}),
                        var(${colorKeys[1]}),
                        var(${colorKeys[0]})
                    )
                `
            }}
        >
            {children}
        </div>
    )
}

export default IrisContainer