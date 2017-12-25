export  const baseURL = "http://localhost:3001"

const DATA_IS_LOADING = 'DATA_IS_LOADING';
const SERVER_COMMUNICATION_ERROR = 'SERVER_COMMUNICATION_ERROR';

export function indicateServerCommunicationAction(isLoading) {
    return {
        type: DATA_IS_LOADING,
        isLoading
    };
}

export function errorCommunicatingWithServerAction (error, customMessage) {
    return {
        type: SERVER_COMMUNICATION_ERROR,
        error,
        customMessage
    };
}