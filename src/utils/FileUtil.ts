import * as fs from "fs";

/**
 * 해당 폴더에 포함된 모든 파일을 재귀적으로 탐색해 경로명을 얻습니다.
 * @param path 폴더 경로명
 * @param extensions 확장자 리스트, 없으면 확장자 상관없이 가져옵니다.
 * @returns 경로명 리스트, 만약 불러올 수 없다면 빈 리스트.
 */
function getFilesRecursively (path: string, extensions: string[] = null): string[]  {
	let files: string[] = [];
	fs.readdirSync(path, {withFileTypes: true}).forEach((entry) => {
		const fullPath: string = path + "\\" + entry.name;
		if (entry.isDirectory()) {
			files = files.concat(getFilesRecursively(fullPath, extensions))
		}
		else {
			if (extensions && !extensions.some(fullPath.endsWith))
				return;
			files.push(fullPath);
		}
	});
	return files;
}

export default {
	getFilesRecursively
}