import urllib.request
import re
import sys

def audit_url(url):
    print(f"--- SEO Audit for: {url} ---")
    try:
        response = urllib.request.urlopen(url)
        content = response.read().decode('utf-8')
        
        # Check Title
        title = re.search('<title>(.*?)</title>', content, re.IGNORECASE)
        print(f"Title: {title.group(1) if title else 'MISSING'}")
        
        # Check Meta Description
        desc = re.search('<meta name="description" content="(.*?)"', content, re.IGNORECASE)
        print(f"Description: {desc.group(1) if desc else 'MISSING'}")
        
        # Check H1
        h1 = re.search('<h1>(.*?)</h1>', content, re.IGNORECASE)
        print(f"H1: {h1.group(1) if h1 else 'MISSING'}")
        
        # Check Robots.txt
        robots_url = url.rstrip('/') + '/robots.txt'
        try:
            robots_res = urllib.request.urlopen(robots_url)
            print(f"Robots.txt: FOUND ({robots_url})")
        except:
            print("Robots.txt: NOT FOUND")
            
        # Check Sitemap
        sitemap_url = url.rstrip('/') + '/sitemap.xml'
        try:
            sitemap_res = urllib.request.urlopen(sitemap_url)
            print(f"Sitemap: FOUND ({sitemap_url})")
        except:
            print("Sitemap: NOT FOUND")
            
    except Exception as e:
        print(f"Error auditing URL: {e}")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "https://usmlepredictor.com"
    audit_url(target)
