# theme

0.  install 1) [node ^14.16.0](https://nodejs.org/en/); 2) [yarn](https://yarnpkg.com/getting-started/install); 3) [git](https://git-scm.com/downloads); 4) [vscode](https://code.visualstudio.com/);
1.  open a terminal where you would like to store the theme project
2.  clone the repository:

		git clone https://github.com/luxecadev/theme.git

3.  install libraries:
    yarn install
4.  open vscode editor
    code .
5.  in vscode install three vscode extensions which are 1)prettier - Code formatter; 2)ESLint; 3)Liquid Languages Support;

		Ctrl + P
		ext install esbenp.prettier-vscode

		Ctrl + P
		ext install dbaeumer.vscode-eslint

		Ctrl + P
		ext install neilding.language-liquid

6.  in vscode, create a new file .env, copy paste the following code to it, [SHOP_NAME] and [STOREFRONT_ACCESS_TOKEN]
    need to be replaced by the real values. You can find the two values in your shopify store

		SHOP_NAME=[SHOP_NAME]
		STOREFRONT_ACCESS_TOKEN=[STOREFRONT_ACCESS_TOKEN]

7.  in vscode, create a new file config.yml, copy paste the following code to it, [PASSWORD], [THEME_ID] and [SHOP_URL]
    need to be replaced by the real values. You can find the three values in your shopify store

				development:
					password: [PASSWORD]
					theme_id: [THEME_ID]
					store: [SHOP_URL]

8.  follow this [document](https://shopify.dev/tools/theme-kit/getting-started) and install theme kit
9.  navigate to "theme" folder. synchronize files with current theme

			theme download

10. if you are going to work on files outside of src folder, start theme watcher; if you are going to work on files in the src folder, start theme watcher as well as parcel watcher respectively in two terminals

		theme watch
		yarn dev

11. happy coding!
