import MaterialButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export default withStyles({
    root: {
      height: 'clamp(7px, min(3.5vh, 4.5vw), 35px)',
      width: 'clamp(9px, 6vw, 70px)', 
      minWidth: '9px'
    },
    label: {
      textTransform: 'capitalize',
      fontSize: "clamp(5px, 2.5vw, 17px)"
    }
  })(MaterialButton);