import config from '../../config/index'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utiles'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated increment ID
  // default password
  const id = await generateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.user_default_password as string
  }

  const createdUser = await User.create(user)
  if (!createUser) {
    throw new Error('Fail to create user.')
  }
  return createdUser
}
export default {
  createUser,
}
