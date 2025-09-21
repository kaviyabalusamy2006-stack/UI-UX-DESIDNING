import requests
import json

def fetch_repo_info():
    """Fetch repository information from GitHub API"""
    url = "https://api.github.com/repos/FOSSEE/workshop_booking"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            repo_data = response.json()
            print("Repository Information:")
            print(f"Name: {repo_data['name']}")
            print(f"Description: {repo_data['description']}")
            print(f"Language: {repo_data['language']}")
            print(f"Stars: {repo_data['stargazers_count']}")
            print(f"Forks: {repo_data['forks_count']}")
            print(f"Clone URL: {repo_data['clone_url']}")
            return True
        else:
            print(f"Error: {response.status_code}")
            return False
    except Exception as e:
        print(f"Error fetching repository: {e}")
        return False

def fetch_repo_contents():
    """Fetch repository contents"""
    url = "https://api.github.com/repos/FOSSEE/workshop_booking/contents"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            contents = response.json()
            print("\nRepository Contents:")
            for item in contents:
                print(f"- {item['name']} ({item['type']})")
            return contents
        else:
            print(f"Error fetching contents: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error fetching contents: {e}")
        return None

if __name__ == "__main__":
    print("Fetching FOSSEE workshop_booking repository information...")
    if fetch_repo_info():
        fetch_repo_contents()
