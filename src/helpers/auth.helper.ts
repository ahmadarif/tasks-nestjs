import * as moment from 'moment';
import { AccessToken } from 'src/models/accesstoken';
import { User } from 'src/models/user';
import { AuthDto } from 'src/modules/user/user.dto';

export async function getAuth(token: string): Promise<AuthDto> {
  if (token == null || token === 'null' || token === '') {
    throw new Error('Token is not available');
  }

  const accessToken = await AccessToken.createQueryBuilder('accessToken')
    .where('accessToken.id = :id', { id: token })
    .getOne();

  if (!accessToken) {
    throw new Error('Invalid access token: ' + token);
  }
  return await getUserData(accessToken.userId, token);
}

export async function createToken(id: string) {
  try {
    const now = moment().toDate();
    const accessToken = await AccessToken.createQueryBuilder()
      .insert()
      .values({
        userId: id,
        createdDate: now,
      })
      .execute();
    const token = accessToken.generatedMaps[0].id;
    return await getUserData(id, token);
  } catch (e) {
    throw e;
  }
}

export async function getUserData(id: string, accessToken: string) {
  try {
    const user = await User.createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .select([
          'user.id',
          'user.username',
          'user.email',
      ])
      .getOne();
    const token = await AccessToken.createQueryBuilder('accessToken')
      .where('accessToken.id = :id', { id: accessToken })
      .andWhere('accessToken.userId = :userId', { userId: id })
      .getOne();
    if (!token) {
      throw new Error('Invalid access token');
    }
    return {
      accessToken: token,
      userData: user,
    };
  } catch (e) {
    throw e;
  }
}
