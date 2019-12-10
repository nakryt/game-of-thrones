export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/'
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch url ${this._apiBase}${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource('characters?page=5&pageSize=10')
        return res.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const char = await this.getResource(`characters/${id}`)
        return this._transformCharacter(char)
    }

    getAllHouses = async () => {
        const res = await this.getResource('houses/')
        return res.map(this._transformHouse)
    }
    getHouse = async (id) => {
        const house = await this.getResource(`houses/${id}`)
        return this._transformHouse(house)
    }

    getAllBooks = async () => {
        const res = await this.getResource('books/')
        return res.map(this._transformBook)
    }
    getBook = async (id) => {
        const book = this.getResource(`books/${id}`)
        return this._transformBook(book)
    }

    _transformCharacter = char => {
        return {
            id: this._extractId(char),
            name: this.isSetData(char.name),
            gender: this.isSetData(char.gender),
            born: this.isSetData(char.born),
            died: this.isSetData(char.died),
            culture: this.isSetData(char.culture),
        }
    }

    _transformHouse = house => {
        return {
            id: this._extractId(house),
            name: this.isSetData(house.name),
            region: this.isSetData(house.region),
            words: this.isSetData(house.words),
            titles: this.isSetData(house.titles),
            overlord: this.isSetData(house.overlord),
            ancestralWeapons: this.isSetData(house.ancestralWeapons)
        }
    }

    _transformBook = book => {
        return {
            id: this._extractId(book),
            name: this.isSetData(book.name),
            numberOfPages: this.isSetData(book.numberOfPages),
            publiser: this.isSetData(book.publiser),
            released: this.isSetData(book.released)
        }
    }

    isSetData = data => data ? data : 'no data'
    _extractId = item => {
        const idRegExp = /\/([0-9]*)$/
        return item.url.match(idRegExp)[1]
    }


}