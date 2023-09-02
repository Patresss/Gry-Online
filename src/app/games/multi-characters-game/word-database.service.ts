import { Injectable } from '@angular/core';
import {clear, get, keys, set} from "idb-keyval";
import {Word} from "./word.model";

@Injectable({
  providedIn: 'root'
})
export class WordDatabaseService {

  async loadFromDatabase(): Promise<Word[]> {
    const words: Word[] = [];

    for (const fileKey of await keys()) {
      const fileData = await get<ArrayBuffer>(fileKey);
      if (fileData) {
        const blob = new Blob([fileData], {type: 'image/jpeg'});
        const file = new File([blob], fileKey.toString(), {type: 'image/jpeg'});
        words.push(  { file: file, name: fileKey.toString().replace('.jpg', '')})
      }
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
          const fileData = await this.readFile(file);
          await set(file.name, fileData);
          words.push(  { file: file, name: file.name.replace('.jpg', '')})
        }
      }
    }
    return words;
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

}
