import * as serviceAuth from '@/services/apiServices/auth';

export const logout = async () => {
    const { currentSocket = null } = window.store.getState();
    if (currentSocket) {
        currentSocket.disconnectFromChat();
    }

    await serviceAuth.logout();
};
