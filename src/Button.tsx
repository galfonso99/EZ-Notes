import MaterialButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export default withStyles({
    root: {
      height: 'clamp(7px, min(4.5vh, 6vw), 35px)',
      width: 'clamp(9px, 8vw, 70px)', 
      minWidth: '9px'
    },
    label: {
      textTransform: 'capitalize',
      fontSize: "clamp(5px, 2.5vw, 17px)"
    }
  })(MaterialButton);