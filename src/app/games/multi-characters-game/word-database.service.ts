import {Injectable} from '@angular/core';
import {clear, get, keys, set} from "idb-keyval";
import {Word} from "./word.model";

@Injectable({
    providedIn: 'root'
})
export class WordDatabaseService {

    defaultWords: Word[] = [
        {name: 'ARBUZ', assetSource: `assets/single-letter/images/A.jpg`},
        {name: 'BALON', assetSource: `assets/single-letter/images/B.jpg`},
        {name: 'CIASTKO', assetSource: `assets/single-letter/images/C.jpg`},
        {name: 'DOM', assetSource: `assets/single-letter/images/D.jpg`},
        {name: 'EKRAN', assetSource: `assets/single-letter/images/E.jpg`},
        {name: 'FOTEL', assetSource: `assets/single-letter/images/F.jpg`},
        {name: 'GITARA', assetSource: `assets/single-letter/images/G.jpg`},
        {name: 'HAMAK', assetSource: `assets/single-letter/images/H.jpg`},
        {name: 'KOT', assetSource: `assets/single-letter/images/K.jpg`},
        {name: 'LAMPA', assetSource: `assets/single-letter/images/L.jpg`},
        {name: 'MLEKO', assetSource: `assets/single-letter/images/M.jpg`},
        {name: 'OKNO', assetSource: `assets/single-letter/images/O.jpg`},
        {name: 'PIES', assetSource: `assets/single-letter/images/P.jpg`},
        {name: 'ROWER', assetSource: `assets/single-letter/images/R.jpg`},
        {name: 'TORT', assetSource: `assets/single-letter/images/T.jpg`},
        {name: 'UL', assetSource: `assets/single-letter/images/U.jpg`},
        {name: 'WODA', assetSource: `assets/single-letter/images/W.jpg`},
        {name: 'YETI', assetSource: `assets/single-letter/images/Y.jpg`},
        {name: 'ZAMEK', assetSource: `assets/single-letter/images/Z.jpg`},
    ];


    async loadFromDatabase(): Promise<Word[]> {
        const words: Word[] = [];

        for (const fileKey of await keys()) {
            const fileData = await get<ArrayBuffer>(fileKey);
            if (fileData) {
                const extension = fileKey.toString().toLowerCase().split(".").pop();
                if (extension === "jpg" || extension === "jpeg") {
                    console.log(extension)
                    const blob = new Blob([fileData], {type: 'image/jpeg'});
                    const file = new File([blob], fileKey.toString(), {type: 'image/jpeg'});
                    words.push({file: file, name: this.asWord(fileKey.toString())})
                }
            }
        }

        if (words.length == 0) {
            return this.defaultWords;
        }
        return words;
    }


    public async onFilesSelected(event: Event): Promise<Word[]> {
        const words: Word[] = [];
        const input = event.target as HTMLInputElement;
        if (input && input.files) {
            await clear();
            const filesArray = Array.from(input.files);
            for (let i = 0; i < filesArray.length; i++) {
                const file = filesArray[i];
                if (file) {
                    if (this.isJpg(file)) {
                        const fileData = await this.readFile(file);
                        await set(file.name, fileData);
                        words.push({file: file, name: this.asWord(file.name)})
                    }
                }
            }
        }
        return words;
    }

    private isJpg(file: File) {
        const extension = file.name.toString().toLowerCase().split(".").pop();
        return extension === "jpg" || extension === "jpeg";

    }

    public async clear(): Promise<Word[]> {
        await clear();
        return this.defaultWords;
    }

    private readFile(file: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target?.result as ArrayBuffer);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    private asWord(fileName: string): string {
        return fileName.toUpperCase()
            .replace('.JPEG', '')
            .replace('.JPG', '');
    }

}
