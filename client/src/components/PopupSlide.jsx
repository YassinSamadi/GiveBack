import React, { useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, animated, config } from 'react-spring';
import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const MyDialog = styled('div')(({ theme }) => ({
  height: '90%',
  width: '100%',
  position: 'absolute',
  top: '10%',
  zIndex: 9999,
  background: 'white',
}));

export default function DraggableDialog() {
  const [open, setOpen] = useState(false);

  const [{ y }, set] = useSpring(() => ({
    y: open ? 0 : window.innerHeight,
    config: config.slow,
  }));

  const bind = useDrag(
    ({ down, movement: [, my], cancel, velocity }) => {
      if (my < 0) {
        cancel();
      }
      const shouldClose = velocity > 1 || my > window.innerHeight / 2;
      if (down) {
        set({ y: my, immediate: true, config: config.stiff });
      } else {
        if (shouldClose) {
          setOpen(false);
        }
        set({ y: 0, immediate: false, config: config.slow });
      }
    },
    { axis: 'y' }
  );

  const handleClickOpen = () => {
    setOpen(true);
    set({ y: 0, immediate: false, config: config.slow });
  };

  const handleClose = () => {
    setOpen(false);
    set({ y: window.innerHeight, immediate: false, config: config.slow });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Draggable Dialog
      </Button>
      <animated.div style={{ transform: y.interpolate(y => `translate3d(0,${y}px,0)`) }}>
        {open && (
          <MyDialog {...bind()} >
            <Paper>
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Use Google's location service?
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={(theme) => ({
                    position: 'absolute',
                    right: theme.spacing(1),
                    top: theme.spacing(1),
                    color: theme.palette.grey[500],
                  })}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </DialogContent>
            </Paper>
          </MyDialog>
        )}
      </animated.div>
    </div>
  );
}
