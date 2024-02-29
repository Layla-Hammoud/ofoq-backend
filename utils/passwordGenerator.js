import generatePassword from 'generate-password';
export const  generateStrongPassword = () => {
    const password = generatePassword.generate({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      strict: true,
    });
  
    return password;
  }
  