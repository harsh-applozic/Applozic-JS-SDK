// import md5File from 'md5-file';
import { addLocalGitTag, pushGitTags, checkIfTagExists } from '../lib/git';
import { getStorybookHash } from '../utils/storybook';

const release = async () => {
  // Check file hash
  const hash = await getStorybookHash();
  const releaseName = `release-storybook-${hash}`;

  if (await checkIfTagExists(releaseName)) {
    console.log('Storybook with current changes already released');
    process.exit(1);
  }

  const annotation = `storybook release: ${hash}`;
  await addLocalGitTag(releaseName, annotation);
  await pushGitTags();
  process.exit(0);
};

release();
