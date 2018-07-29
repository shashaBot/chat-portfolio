import styles from '../../styles/vendor/flexboxgrid2.css';

export default function getClass(className) {
  return (styles && styles[className]) ? styles[className] : className;
}
