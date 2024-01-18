import React, { useEffect } from 'react';
import { Tooltip, TooltipProps } from '@rneui/themed';


const ControlledTooltip_1: React.FC<any> = (props) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(props.open);
    // console.log(open)
    }, [props.open]); 
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    />
  );
};
export default ControlledTooltip_1;