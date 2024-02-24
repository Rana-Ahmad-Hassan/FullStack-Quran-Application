import bcrypt from "bcrypt"


export const bcryptHashPassword = async (password) => {
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}


export const compareBcryptPassword = async (password,hashPassword) => {
    const comparePassword = await bcrypt.compare(password,hashPassword)
    return comparePassword
}