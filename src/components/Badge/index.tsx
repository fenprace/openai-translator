import classes from './styles.module.css'

export const Badge = ({
  shown,
  onClick,
}: {
  shown: boolean
  onClick: React.MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div
      id="__badge"
      className={classes.badge}
      style={{ display: shown ? 'flex' : 'none' }}
      onClick={onClick}
    >
      <span className={classes.icon}>翻</span>
    </div>
  )
}
