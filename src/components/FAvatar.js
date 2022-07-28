const FAvatar = ({name,className,...props}) => {
  return (<>
      <div  style={{
          width:"35px",
          height:"35px",
          backgroundImage:`URL('https://ui-avatars.com/api/?name=${name.split(' ').join('+')}&background=random')`,
          backgroundSize:"cover",
          backgroundPosition:"center"


      }} {...props}
           className={`rounded ${className}`}>
      </div>

  </>)
}
export default FAvatar


