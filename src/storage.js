const key = 'react-todo-list';

export default {

    setItems(items) {
        window.localStorage.setItem(key, JSON.stringify(items));
    },

    getItems() {
        const todos = window.localStorage.getItem(key);
        return JSON.parse(todos);
    }

}