import BaseClient, { BaseResponse, METHODS } from '../../base';
import { UserRoles } from '../../models/Group';
import Group from '../../models/Group';

const ENDPOINT = '/rest/ws/group/update';

export interface IUpdateGroupUser {
  userId: string;
  role: UserRoles;
}

/** For usage, see {@link GroupsApi.updateGroupInfo} */
export interface IUpdateGroupDetailsRequest {
  groupId?: string;
  clientGroupId?: string;
  newName?: string;
  imageUrl?: string;
  metadata?: { [key: string]: string };
  users?: IUpdateGroupUser[];
}

/** For usage, see {@link GroupsApi.updateGroupInfo} */
export interface UpdateGroupDetailsApi {
  (data: IUpdateGroupDetailsRequest): Promise<Group>;
}

const updateGroupDetailsBuilder = (
  applozicClient: BaseClient
): UpdateGroupDetailsApi => {
  const updateGroupDetailsApi: UpdateGroupDetailsApi = async data => {
    const response: BaseResponse<Group> = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data,
        useAuth: true
      }
    );
    return response.response;
  };
  return updateGroupDetailsApi;
};

export default updateGroupDetailsBuilder;
