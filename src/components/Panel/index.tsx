import classes from './styles.module.css'

export const Panel = ({
  shown,
  selected,
}: {
  shown: boolean
  selected: string
}) => {
  return (
    <div
      id="__panel"
      className={classes.panel}
      style={{ display: shown ? 'flex' : 'none' }}
    >
      {selected}
    </div>
  )
}
