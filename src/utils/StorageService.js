class StorageService{
    static subscribe(callback){
        window.addEventListener('storage', callback);
        return () => window.removeEventListener('storage', callback);
    }

    static emit(){
        window.dispatchEvent(new Event('storage'));
    }
}

export default StorageService;