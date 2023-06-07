import { Fireworks } from '@fireworks-js/react';

const Firework = () => {
    return (
        <Fireworks
        options={{
          rocketsPoint: {
            min: 0,
            max: 100,
            explosion: 5,
            intensity: 60,
            particles: 200
          }
        }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          background: 'transparent'
        }}
      />
    );
}

export default Firework;