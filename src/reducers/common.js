const DATA_IS_LOADING = 'DATA_IS_LOADING';
const SERVER_COMMUNICATION_ERROR = 'SERVER_COMMUNICATION_ERROR';

export function dataIsLoading (state = false, action) {
    switch (action.type) {
        case DATA_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

export function serverCommunicationError (state = {}, action) {
    switch (action.type) {
        case SERVER_COMMUNICATION_ERROR:
            return {'error': action.error, 'message': action.customMessage};

        default:
            return state;
    }
}