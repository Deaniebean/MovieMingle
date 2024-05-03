// This model is created to simplify testing my functions in isiolation from the database
interface UserModel{
    username: string,
    password: string,
    uuid: string
    watch_list: string[],
    history: string[]
}
export default UserModel;