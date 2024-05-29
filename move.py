import os
import shutil
import config

# Paths
training_path = os.path.join(config.train_path_msvd, "video")
testing_path = os.path.join(config.test_path_msvd, "video")
file_list_path = os.path.join(config.test_path_msvd,"testing_id.txt")  # Path to the file containing filenames

# Read filenames from testing_id.txt
with open(file_list_path, "r") as file:
    filenames = file.read().splitlines()

# Move files
for filename in filenames:
    src = os.path.join(training_path, filename)
    dst = os.path.join(testing_path, filename)
    try:
        shutil.move(src, dst)
        print(f"Moved {filename} successfully.")
    except FileNotFoundError:
        print(f"File {filename} not found in {training_path}.")
    except Exception as e:
        print(f"Error moving {filename}: {e}")
