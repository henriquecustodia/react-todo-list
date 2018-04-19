import { KEY_CODES } from './constants';

export function noop() { };

export function isEnterKey(event) {
    if (!event.keyCode) {
        return false;
    }

    return event.keyCode === KEY_CODES.ENTER;
}