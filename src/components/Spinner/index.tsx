import classes from './styles.module.css'

export const Spinner = () => {
  return (
    <div className={classes.card}>
      <div className={classes.loader} />
    </div>
  )
}
