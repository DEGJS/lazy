const lazy = (options = {}) => {

    const defaults = {
        elSelector: '[data-lazy]',
        animationClass: null,
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.1,
        unbindAfterIntersect: true,
        onIntersectionCallback: null,
        onNonIntersectionCallback: null
    };
    let initialIntersection = true;
    let observer = null;
    let settings;
    let els;

    const init = () => {
        settings = {...defaults, ...options};
        els = [...document.querySelectorAll(`${settings.elSelector}`)];
        intersectionObserverIsSupported() ? bindObserver(els) : load(els);
    };

    const bindObserver = els => {
        observer = new IntersectionObserver(onIntersection, {
            root: settings.root,
            rootMargin: settings.rootMargin,
            threshold: settings.threshold
        });
        observe(els);
    };

    const onIntersection = entries => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                load(el);
            } else {
                onNonIntersection(el);
            }
        });
    };

    const onNonIntersection = el => {
        if (settings.onNonIntersectionCallback !== null && 
            initialIntersection === false) {
            settings.onNonIntersectionCallback(el);
        }
        initialIntersection = false;
    };

    const observe = (els = null) => {
        if (els && observer !== null) {
            const elsArr = ensureArray(els);
            elsArr.forEach(el => observer.observe(el));
        }
    };

    const load = els => {
        if (els) {
            const elsArr = ensureArray(els);
            elsArr.forEach(el => {
                unbindObserver(el);
                if (settings.onIntersectionCallback !== null && 
                    initialIntersection === false) {
                    settings.onIntersectionCallback(el);
                } else {
                    setElAttrs(el);
                }
            });
            initialIntersection = false;
        }
    };

    const unbindObserver = el => {
        if (observer && settings.unbindAfterIntersect === true) {
            observer.unobserve(el);
        }
    };

    const setElAttrs = el => {
        if (settings.animationClass) {
            el.classList.add(settings.animationClass);
        }
        if (el.dataset.src) {
            el.src = el.dataset.src;
        }
        if (el.dataset.srcset) {
            el.srcset = el.dataset.srcset;
        }
    };

    const ensureArray = maybeArr => Array.isArray(maybeArr) ? maybeArr : [maybeArr];
    
    const intersectionObserverIsSupported = () => 'IntersectionObserver' in window;

    init();

    return {
        observe,
        load
    };

};

export default lazy;
