export class DataModel {
    /**
     * In memory data store of model entries
     */
    static data = [];
    
    /**
     * Find and return matching entries based in the filter predicate provided.
     * 
     * @param {*} filter - A filter predicate, matching entries are returned.
     * @returns {Array<T>} matching entries.
     */
    static select(filter) {
        if (typeof filter === "function") {
            return this.data.filter(filter)
        } else {
            return this.data
        }
    }
    
    /**
     * Updates matching entries based in the filter predicate provided.
     * 
     * @param {*} filter - A filter predicate, matching entries are deleted.
     * @param {*} entry - The updated entry.
     * @returns the number of deleted entries
     */
    static update(filter, entry) {
        if (typeof filter !== "function") {
            throw new Error("Filter must be a predicate function.");
        }

        let count = 0;
        for (let index = 0; index < this.data.length; index++) {
            if (filter(this.data[index])) {
                this.data[index] = entry.clone();
                count++;
            }
        }
        return count;
    }
    
    /**
     * 
     * @param {any} entry - The entry object to insert into the data store.
     * @returns 
     */
    static insert(entry) {
        this.data.push(entry.clone());
    }

    /**
     * Delete matching entries based in the filter predicate provided.
     * 
     * @param {*} filter - A filter predicate, matching entries are deleted.
     * @returns the number of deleted entries
     */
    static delete(filter) {
        if (typeof filter !== "function") {
            throw new Error("Filter must be a predicate function.");
        }

        const countBefore = this.data.length;
        this.data = this.data.filter(entry => !filter(entry));
        return countBefore - this.data.length;
    }
    
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    }
}