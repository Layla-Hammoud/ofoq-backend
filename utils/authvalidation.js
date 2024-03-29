import  validator  from "validator";

const validateRegister = (data) => {
    const errors = {};
    console.log(data)
    if (!validator.isEmail(data.email)) {
      errors.email = 'Please provide a valid email address.';
    }

    if (data.userName && !validator.isLength(data.userName, { min: 3 })) {
      errors.userName = 'User name must be at least 3 characters.';
    }

     // Validate password if it exists and the user is not a teacher
     if (data.password && data.role !== 'teacher') {
      // Validate password if it exists
      if (data.password && !validator.isLength(data.password, { min: 8 })) {
        errors.password = 'Password must be at least 8 characters.';
      }
  
      if (data.password && !validator.matches(data.password, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      }
    }
    return errors;
  };

  const validateLogin = (data) => {
    const errors = {};
  
    if (!validator.isEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    if (!validator.isLength(data.password, { min: 8 })) {
        errors.password = 'Password must be at least 8 characters.';
      }
  
      if (!validator.matches(data.password, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/)){
          errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      }
  
    return errors;
  };

  export{validateRegister, validateLogin}