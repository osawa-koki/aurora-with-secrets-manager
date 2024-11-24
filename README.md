# aurora-with-secrets-manager

🎺🎺🎺 AuroraデータベースにSecrets Managerを利用してパスワードを管理する！  

## デプロイ

DevContainerに入り、以下のコマンドを実行します。  
※ `~/.aws/credentials`にAWSの認証情報があることを前提とします。  

```bash
cdk synth
cdk bootstrap
cdk deploy --require-approval never --all
```

デプロイが完了したら、接続に必要な情報を取得します。  
※ セキュリティを考慮すると、プログラム内で動的に取得するのが望ましいです。  

```bash
export AURORA_SECRET_NAME=$(aws cloudformation describe-stacks --stack-name AuroraWithSecretsManagerStack-output --query "Stacks[0].Outputs[?OutputKey=='AuroraSecretName'].OutputValue" --output text)

aws secretsmanager get-secret-value \
    --secret-id $AURORA_SECRET_NAME \
    --query 'SecretString' \
    --output text
```

## 注意点

- テスト用のため、データベースをインターネットからアクセス可能なパブリックサブネットに配置しています。
