const random = (min, max) => {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
  };
  
  export default random;