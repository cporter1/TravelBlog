function goTo(dest) {
    window.history.pushState({} , '' , dest)
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
}

export {goTo}