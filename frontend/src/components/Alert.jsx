const Alert = ({alert}) => {
  return (
    <div className={`${alert.error? 'from-red-400 to-red-600': 'from-sky-300 to-sky-500'} 
    bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold 
    text-sm my-10`}>
        {alert.msg}
    </div>
  )
}

export default Alert