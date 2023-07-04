### Standard Usage

Upload a file and then check the console.

N.B. This example is used for the integration tests, please run them before and after you make changes.

```jsx
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";
import { FileUploader } from "./";

const [filesUploaded, setFilesUploaded] = React.useState([]);

<MockCameraUploadHandler>
  <div data-test="FileUploader-scenario-basic">
    <FileUploader
      acceptedFileTypes="image/*"
      onFilesUploaded={(files) =>
        setFilesUploaded([...filesUploaded, ...files])
      }
      maxFiles={5}
    />
    {filesUploaded.length > 0 && (
      <div>
        Selected:
        <div data-test="output">
          {filesUploaded &&
            filesUploaded.map((f, i) => {
              return (
                // i + 1 because we start at 1 here.
                <p key={i} data-test={`output-${i + 1}`}>
                  {JSON.stringify(f, null, 2)}
                </p>
              );
            })}
        </div>
        <br />
        <a onClick={() => setFilesUploaded([])}>Clear</a>
      </div>
    )}
  </div>
</MockCameraUploadHandler>;
```

### Maximum Files

Any files over the limit are discarded and an alert is displayed to the user.

N.B. This example is used for the integration tests, please run them before and after you make changes.

```jsx
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";
import { FileUploader } from "./";

const [filesUploaded, setFilesUploaded] = React.useState([]);

<MockCameraUploadHandler>
  <div data-test="FileUploader-scenario-max-files">
    <FileUploader
      acceptedFileTypes="image/*"
      onFilesUploaded={(files) =>
        setFilesUploaded([...filesUploaded, ...files])
      }
      maxFiles={2}
    />
    {filesUploaded.length > 0 && (
      <div>
        Selected:
        <div data-test="output">
          {filesUploaded &&
            filesUploaded.map((f, i) => {
              return (
                // i + 1 because we start at 1 here.
                <p key={i} data-test={`output-${i + 1}`}>
                  {JSON.stringify(f, null, 2)}
                </p>
              );
            })}
        </div>
        <br />
        <a onClick={() => setFilesUploaded([])}>Clear</a>
      </div>
    )}
  </div>
</MockCameraUploadHandler>;
```

### Disabled

N.B. This example is used for the integration tests, please run them before and after you make changes.

```jsx
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";
import { FileUploader } from "./";

const [filesUploaded, setFilesUploaded] = React.useState([]);

<MockCameraUploadHandler>
  <div data-test="FileUploader-scenario-disabled">
    <FileUploader
      disabled={true}
      acceptedFileTypes="image/*"
      onFilesUploaded={(files) =>
        setFilesUploaded([...filesUploaded, ...files])
      }
      maxFiles={5}
    />
    <div>
      Selected:
      <div data-test="output">
        {filesUploaded &&
          filesUploaded.map((f, i) => {
            return (
              // i + 1 because we start at 1 here.
              <p key={i} data-test={`output-${i + 1}`}>
                {JSON.stringify(f, null, 2)}
              </p>
            );
          })}
      </div>
      <br />
      <a onClick={() => setFilesUploaded([])}>Clear</a>
    </div>
  </div>
</MockCameraUploadHandler>;
```

### Maintaining previous uploads

This is where it this component might be used as an input

```jsx
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";
import { FileUploader } from "./";

const [existingFiles, setExistingFiles] = React.useState([
  {
    url:
      "https://www.placecage.com/gif/200/200?randomNumber=" +
      Math.floor(Math.random() * 1000),
    fileName: "test",
  },
]);

<MockCameraUploadHandler>
  <FileUploader
    acceptedFileTypes="image/*"
    existingFiles={existingFiles}
    onFilesUploaded={(f) => setExistingFiles([...existingFiles, ...f])}
    onFileRemoved={(f) => {
      setExistingFiles([...existingFiles.filter((x) => x.url !== f.url)]);
    }}
    maxFiles={5}
  />
</MockCameraUploadHandler>;
```
