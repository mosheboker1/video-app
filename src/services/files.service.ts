import * as localforage from 'localforage';

const KEY: string = 'VIDEOS';

class UploadFiles {
    files: any;

    async saveFile(value) {
        let videos: any[] = (await this.getFiles() as any[]) ?? [];
        videos.push(value);
        await localforage.setItem(KEY, videos);
    }

    getFiles() {
        return localforage.getItem(KEY);
    }

    resetValues() {
        localforage.clear();
    }
}

let uploads = new UploadFiles();

export default uploads;
